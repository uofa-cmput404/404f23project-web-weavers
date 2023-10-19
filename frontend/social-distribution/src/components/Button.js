import { colors,spacing,sizes, buttonSizes } from "../utils/theme";


export default function Button({ children, btn_type, ...attributes }) {
    const btnType = {
      primary: btn_type === 'primary',
      secondary: btn_type === 'secondary',
      tertiary: btn_type === 'tertiary',
      // conditional: btn_type == "conditional",
    }

    // const destination = "/" + dest;

    // const navigate = useNavigate();
    // const onButtonClick = () => {
    //   if(type !== "conditional"){
    //     navigate(destination)
    //   }else{
    //     if(attributes.username === "123" && attributes.password == "123"){
    //       navigate(destination)
    //     }
    //   }
    // }

    return (
      <button
        style={{
          ...(btnType.primary && styles.primary),
          ...(btnType.secondary && styles.secondary),
          ...(btnType.tertiary && styles.tertiary),
          // ...(btnType.conditional && styles.secondary),
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

