export default function reducer(state = {}, action = {}) {
  switch (action.type) {
    case "SHOW_ALERT_MESSAGE":
      return {
        ...state,
        alertMessage: action.alertMessage,
        showAlert: true
      };
    case "HIDE_ALERT_MESSAGE":
      return {
        ...state,
        alertMessage: {},
        showAlert: false
      };
    default:
      return state;
  }
}