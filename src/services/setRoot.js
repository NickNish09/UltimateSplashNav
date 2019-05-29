import {Navigation} from "react-native-navigation";
import { colors } from "../styles/base";

const bottomTabs = {
  children: [
    {
      stack: {
        children: [
          {
            component: {
              name: "Home",
              options: {
                topBar: {
                  title: {
                    text: "Raspadinha",
                    alignment: "center",
                    color: 'white'
                  },
                  background: {
                    color: colors.primary_dark
                  }
                }
              }
            }
          }
        ],
        options: {
          bottomTab: {
            text: "Raspadinha",
            textColor: "white",
            selectedTextColor: colors.secondary,
            selectedIconColor: colors.secondary,
            icon: require("../assets/icons/thumbs_up_white.png"),
          }
        }
      }
    },
    {
      stack: {
        children: [
          {
            component: {
              name: "Giveaway",
              options: {
                topBar: {
                  title: {
                    text: "Sorteios",
                    alignment: "center",
                    color: 'white'
                  },
                  background: {
                    color: colors.primary_dark
                  }
                }
              }
            }
          }
        ],
        options: {
          bottomTab: {
            text: "Sorteios",
            textColor: "white",
            selectedTextColor: colors.secondary,
            selectedIconColor: colors.secondary,
            icon: require("../assets/icons/history_white.png"),
          }
        }
      }
    },
    {
      stack: {
        children: [
          {
            component: {
              name: "Sale",
              options: {
                topBar: {
                  title: {
                    text: "Loja",
                    alignment: "center",
                    color: 'white'
                  },
                  background: {
                    color: colors.primary_dark
                  }
                }
              }
            }
          }
        ],
        options: {
          bottomTab: {
            text: "Loja",
            textColor: "white",
            selectedTextColor: colors.secondary,
            selectedIconColor: colors.secondary,
            icon: require("../assets/icons/user_white.png"),
          }
        }
      }
    },
    {
      stack: {
        children: [
          {
            component: {
              name: "Profile",
              options: {
                topBar: {
                  title: {
                    text: "Perfil",
                    alignment: "center",
                    color: 'white'
                  },
                  background: {
                    color: colors.primary_dark
                  }
                }
              }
            }
          }
        ],
        options: {
          bottomTab: {
            text: "Perfil",
            textColor: "white",
            selectedTextColor: colors.secondary,
            selectedIconColor: colors.secondary,
            icon: require("../assets/icons/user_white.png"),
          }
        }
      }
    },
  ],
    options: {
    bottomTabs: {
      backgroundColor: colors.primary_dark
    }
  }
};

export const goToAuth = () => Navigation.setRoot({
  root: {
    component: {
      name: "SignIn"
    }
  }
});

export const goToHome = () => Navigation.setRoot({
  root: {
    bottomTabs: bottomTabs
  }
});
