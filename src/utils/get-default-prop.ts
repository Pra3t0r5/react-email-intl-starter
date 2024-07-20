type TArgs = {
  name: string;
  previewDefaultValue: string;
};

const isProduction = process.env.NODE_ENV === "production";

export function getDefaultProp(args: TArgs) {
  if (args.name != args.name.toUpperCase()) {
    throw new Error(
      `\n\n> The name of the prop should be in UPPER_CASE. Please use "${args.name.toUpperCase()}" instead of "${
        args.name
      }"\n\n`
    );
  }

  if (isProduction) {
    return `{{${args.name.toUpperCase()}}}`;
  }

  return args.previewDefaultValue;
}
