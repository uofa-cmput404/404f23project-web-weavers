import { colors,spacing,sizes, buttonSizes } from "../utils/theme";


export default function Button({ children, btn_type, ...attributes }) {
    const btnType = {
      primary: btn_type === 'primary',
      secondary: btn_type === 'secondary',
      tertiary: btn_type === 'tertiary',
    }

    return (
      <button
        style={{
          ...(btnType.primary && styles.primary),
          ...(btnType.secondary && styles.secondary),
          ...(btnType.tertiary && styles.tertiary),
        }}
        {...attributes}
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

