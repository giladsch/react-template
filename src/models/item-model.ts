export interface Item {
  name: string;
  id: string;
  completed?: boolean;
}

let uniqueId = () => {
  return (
    Math.random()
      .toString(36)
      .substring(2) + Date.now().toString(36)
  );
};

export let defaultItem = (name: string): Item => {
  return { name: name, id: uniqueId(), completed: false };
};
