import { colors,spacing,sizes, buttonSizes } from "../utils/theme";
export default function Button({ children, type, ...attributes }) {
    const btnType = {
      primary: type === 'primary',
      secondary: type === 'secondary',
      tertiary: type === 'tertiary',
    }

    const destination = attributes.dest;
    console.log(destination);

    return (
      <button
        type="button"
        style={{
          ...(btnType.primary && styles.primary),
          ...(btnType.secondary && styles.secondary),
          ...(btnType.tertiary && styles.tertiary),
          
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

  