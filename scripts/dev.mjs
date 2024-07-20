import fs from "fs";
import path from "path";
import fse from "fs-extra";

import * as fsWalk from "@nodelib/fs.walk";
import watcher from "@parcel/watcher";
import ora from "ora";
import pascalCase from "pascalcase";

const isProduction = process.env.NODE_ENV === "production";
const src = path.join(process.cwd(), "./src/emails");
const output = path.join(process.cwd(), "compiled");

const spinner = ora("Generating email files...");

const walkSettings = new fsWalk.Settings({
  entryFilter: (entry) =>
    entry.dirent.isDirectory() ||
    (entry.path.endsWith(".tsx") && !entry.path.endsWith("email.tsx")),
});

function createCompiledFolder() {
  fsWalk.walk(src, walkSettings, (error, entries) => {
    if (error) {
      console.error(error);
    }

    spinner.start();

    const invalidFolders = [];
    entries.forEach((entry) => {
      if (!entry.dirent.isDirectory()) {
        fs.copyFileSync(entry.path, path.join(output, entry.name));
        return;
      }

      const files = fs.readdirSync(entry.path);
      const relative = path.relative(
        path.join(process.cwd(), "src/emails"),
        entry.path
      );

      // validate that the folder contains the required email and locales files
      if (files.includes("email.tsx") && files.includes("locales.ts")) {
        const out = path.join(output, relative);
        // create the es.tsx, en.tsx and pt.tsx files in the compiled folder
        fs.mkdirSync(out, { recursive: true });

        // Read PreviewProps from email.tsx
        const emailPath = path.join(entry.path, "email.tsx");
        const emailContent = fs.readFileSync(emailPath, "utf8");
        let compPreviewProps = "";

        if (!isProduction && !process.argv.includes("--no-preview-props")) {
          const previewPropsMatch = emailContent.match(
            /Email\.PreviewProps\s*=\s*\{[^}]*\};/
          );
          if (previewPropsMatch) {
            compPreviewProps = previewPropsMatch[0].trim();
          }
        }
        //TODO: Instead of destructuring compPreviewProps directly to _Email props, make them part of compName props with fallback
        ["en", "es", "pt"].forEach((lang) => {
          const compName = `${pascalCase(entry.name)}${pascalCase(lang)}`;

          const compNameKebab = compName
            .replace(/([a-z])([A-Z])/g, "$1-$2")
            .toLowerCase();
          fs.writeFileSync(
            path.join(out, `${compNameKebab}.tsx`),
            compPreviewProps
              ? `import * as React from 'react';
import { Email as _Email } from '@/emails/${relative}/email';

const ${compName}Props = ${compPreviewProps.replace(
                  /Email\.PreviewProps\s*=\s*/,
                  ""
                )}
const ${compName} = () => <_Email {...${compName}Props} lang="${lang}" />;
${compName}.PreviewProps = ${compPreviewProps.replace(
                  /Email\.PreviewProps\s*=\s*/,
                  ""
                )}

export default ${compName};

`
              : `import * as React from 'react';
import { Email as _Email } from '@/emails/${relative}/email';

const ${compName} = () => <_Email lang="${lang}" />;

export default ${compName};

`
          );
        });
      } else {
        invalidFolders.push(relative);
      }
    });

    spinner.succeed("Success to generate email files");

    // log invalid folder so the user can fix them
    if (invalidFolders.length > 0) {
      spinner.warn(`The following folders doesn't contains the required "email.tsx" and "locales.ts" files:
${invalidFolders.map((f) => `  - ${f}`).join("\n")}`);
    }
  });
}

const clearCompiledFolder = () => {
  if (fs.existsSync(output)) {
    fs.rmSync(output, { recursive: true });
  }
};

const copyStaticAssets = () => {
  fs.mkdirSync(path.join(output, "static"), { recursive: true });
  fse.copySync("static", path.join(output, "static"));
};

async function main() {
  clearCompiledFolder();
  createCompiledFolder();
  copyStaticAssets();

  if (process.argv[2] === "--watch") {
    // Subscribe to events
    let subscription;
    // eslint-disable-next-line prefer-const
    subscription = await watcher.subscribe(src, async (err) => {
      if (err) {
        console.error("> Error to run the codegen.");
        console.error(err);
        subscription.unsubscribe();
        process.exit(1);
      }
      createCompiledFolder();
      spinner.info("Watching for changes in the emails folder...");
    });
  }
}

main();
