import { themeInterface } from '../types/'

const gradient = "linear-gradient(90deg, rgb(255, 68, 68), rgb(119, 81, 246), rgb(81, 246, 164))";
const dark = "rgb(22, 22, 22)";

export default ({
  textColor = 'white',
  keywordColor = 'rgb(81, 246, 164)',
}: {
  fontSize?: string | number;
  textColor?: string | number;
  keywordColor?: string | number;
}): {
  default: themeInterface,
  grass: themeInterface,
} => {
  return {
    default: {
      terminaly: {
        fontSize: '14px',
        background: dark,
        borderRadius: 4,
      },
      input: {
        container: {
          background: "rgba(255, 255, 255, 0.048)",
          marginBottom: "15px", 
          paddingTop: "10px"
        },
        name: {
          background: "var(--tmly-gradient)",
          padding: "2px 15px 2px 10px",
          border: "none",
          whiteSpace: "nowrap",
          clipPath: "polygon(0 0, 95% 0%, 100% 50%, 95% 100%, 0 100%, 0% 50%)"
        },
        field: {
          background: "transparent",
          padding: "2px 10px 12px",
          color: "var(--tmly-text-color)"
        },
      },
      outputs: {
        container: {
          padding: "8px 15px 8px 0px"
        },
        item: {
          animation: "terminaly_new_output 0.3s ease",
          background: "transparent",
          padding: "7px 0px",
          margin: "0 20px"
        }
      },
      bar: {
        color: gradient,
        height: 5,
        width: '100%',
        display: 'block'
      },
      variables: {
        '--tmly-keyword-color': keywordColor,
        '--tmly-text-color': textColor,
        '--tmly-gradient': gradient,
      }
    },
    grass: {
      terminaly: {
        fontSize: '14px',
        background: dark,
        borderRadius: 4,
      },
      input: {
        container: {
          background: "rgba(255, 255, 255, 0.048)",
          marginBottom: "15px", 
          paddingTop: "10px"
        },
        name: {
          background: "var(--tmly-gradient)",
          padding: "2px 15px 2px 10px",
          border: "none",
          whiteSpace: "nowrap",
          clipPath: "polygon(0 0, 95% 0%, 100% 50%, 95% 100%, 0 100%, 0% 50%)"
        },
        field: {
          background: "transparent",
          padding: "2px 10px 12px",
          color: "var(--tmly-text-color)"
        },
      },
      outputs: {
        container: {
          padding: "8px 15px 8px 0px"
        },
        item: {
          animation: "terminaly_new_output 0.3s ease",
          background: "transparent",
          padding: "7px 0px",
          margin: "0 20px"
        }
      },
      bar: {
        color: gradient,
        height: 5,
        width: '100%',
        display: 'block'
      },
      variables: {
        '--tmly-keyword-color': keywordColor,
        '--tmly-text-color': textColor,
        '--tmly-gradient': gradient,
      }
    }
  }
}