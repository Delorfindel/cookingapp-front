
export const initialStateUI = {
  error: '',
  replaceNavbar: false,
  isMobile: {
    init: false,
    value: null,
    windowWidth: null,
  },
  menu: {
    toggle: false,
    submenuOpen: false,
    backToMenu: false,
    submenuIndex: 0,
  },
};

export const UIReducer = (prevState = initialStateUI, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'setIsMobile':
      return {
        ...prevState,
        isMobile: {
          init: true,
          value: payload.isMobile,
          width: payload.width,
        },
      };
    case 'menuToggle':
      return {
        ...prevState,
        menu: {
          toggle: !prevState.menu.toggle,
          submenuOpen: false,
          backToMenu: false,
          submenuIndex: 0,
        },
      };
    case 'closeSub':
      return {
        ...prevState,
        menu: {
          ...prevState.menu,
          submenuOpen: false,
          backToMenu: true,
          submenuIndex: 0,
        },
      };
    case 'openSub1':
      return {
        ...prevState,
        menu: {
          ...prevState.menu,
          submenuOpen: true,
          submenuIndex: 1,
        },
      };
    case 'openSub2':
      return {
        ...prevState,
        menu: {
          ...prevState.menu,
          submenuOpen: true,
          submenuIndex: 2,
        },
      };
    default:
      return prevState;
  }
};
