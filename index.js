import * as p from "@clack/prompts";
import color from "picocolors";

let toDos = [
  {
    title: "ToDo 1",
    description: "This is the first todo",
    completed: true,
  },
  {
    title: "ToDo 2",
    description: "This is the second todo",
    completed: false,
  },
];

const addTodo = ({ title, description }) => {
  toDos.push({ title, description, completed: false });
};

const toggleTodo = (index) => {
  toDos[index] = { ...toDos[index], completed: !toDos[index].completed };
};

const deleteTodo = (index) => {
  toDos = toDos.filter((_, i) => i !== index);
};

const commands = [
  { value: "a", label: "Add ToDo" },
  { value: "t", label: "Toggle ToDo" },
  { value: "d", label: "Delete ToDo" },
  { value: "q", label: "Quit" },
];

async function main() {
  while (true) {
    console.clear();

    p.intro(color.bold(color.bgCyan(color.black("ToDo App"))));

    p.note(
      toDos
        .map((x) =>
          x.completed
            ? `${color.bgWhite(color.white(x.title))} - ${x.description}`
            : `${color.bgRed(color.white(x.title))} - ${x.description}`
        )
        .join("\n\n")
    );

    const command = await p.select({
      message: "Select a command",
      options: commands,
    });

    switch (command) {
      case "a":
        const title = await p.text({
          message: "Add a new ToDo",
        });

        const description = await p.text({
          message: "Add a description",
        });

        addTodo({ title, description });

        break;
      case "t":
        const toggleIndex = await p.select({
          message: "Toggle a ToDo",
          options: toDos.map((x, index) => ({
            value: index,
            label: x.title,
          })),
        });
        toggleTodo(toggleIndex);
        break;

      case "d":
        const deleteIndex = await p.select({
          message: "Delete a ToDO",
          options: toDos.map((x, index) => ({
            value: index,
            label: x.title,
          })),
        });
        deleteTodo(deleteIndex);
        break;

      case "q":
        p.outro("Done");
        return process.exit(0);

      default:
        break;
    }

    if (p.isCancel(command)) {
      p.outro("Done");
      return process.exit(0);
    }
  }
}

main().catch(console.error);
