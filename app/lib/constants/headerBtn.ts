type HeaderButton = {
  name: string;
  action: string;
  showInputOnHover?: boolean;
};

export const BUTTONS: HeaderButton[] = [
  {
    name: "To Learn",
    action: "learn",
  },
  {
    name: "Vocabulary",
    action: "vocabulary",
  },
  {
    name: "Learned",
    action: "learned",
  },
  {
    name: "Add Word",
    action: "add-word",
    showInputOnHover: true,
  },
  {
    name: "Blur",
    action: "blur-word",
  },
];
