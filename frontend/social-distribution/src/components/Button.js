import { colors,spacing,sizes, buttonSizes } from "../utils/theme";
export default function Button({ children, ...attributes }) {
    const type = attributes;

    return (
      <button
        type="button"
        style={{
          ...styles.button,
          ...(type.primary && styles.primary),
          ...(type.secondary && styles.secondary),
          ...(type.tertiary && styles.tertiary),
        }}
      >
        {children}
      </button>
    );
  }

  const styles = {
    primary: {
      color: colors.text.t2,
      padding: spacing.md,
      borderRadius: '30px',
      border: 'inset',
      borderColor: "black",
      fontSize: sizes.md,
      backgroundColor: colors.brand.c3,
      width: buttonSizes.md,
      
    },
    secondary: {
      backgroundColor: colors.brand.c4,
      color: colors.text.t2,
      padding: spacing.md,
      borderRadius: '30px',
      border: 'inset',
      borderColor: "black",
      fontSize: sizes.md,
      width: buttonSizes.md,
    },
    tertiary: {
      backgroundColor: colors.brand.c5,
      color: colors.text.t2,
      padding: spacing.md,
      borderRadius: '30px',
      border: 'inset',
      borderColor: "black",
      fontSize: sizes.md,
      width: buttonSizes.md,
    },
  };
  