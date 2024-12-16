interface Tab {
  _id: number;
  name: string;
  value: string;
  type: string;
}

const tabs: Tab[] = [
    {
      _id: 0,
      name: "Булки",
      value: "bun",
      type: "bun",
    },
    {
      _id: 1,
      name: "Соусы",
      value: "sauce",
      type: "sauce",
    },
    {
      _id: 2,
      name: "Начинки",
      value: "main",
      type: "main",
    },
  ];

  export default tabs;