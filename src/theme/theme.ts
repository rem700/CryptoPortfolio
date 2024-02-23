export const theme = {
  token: {
    colorPrimary: "#003b46",
    colorInfo: "#003b46",
    colorTextBase: "#003b46",
    colorSuccess: "#3f8600",
    colorSuccessBg: "#eeefee",
    colorError: "#cf1322",
  },
  components: {
    DatePicker: {
      activeBg: "rgb(102, 165, 173)",
    },
    Spin: {
      colorBgMask: "#001529",
    },
  },
};

export function useTheme() {
  return { theme };
}
