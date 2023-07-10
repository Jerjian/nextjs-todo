import TodoItem from "@/components/TodoItem";
import { prisma } from "@/db";
import Link from "next/link";

async function toggleToDo(id: string, completed: boolean) {
  "use server";
  await prisma.todo.update({
    where: { id },
    data: { completed },
  });
}

export default async function Home() {
  const todos = await getTodos();

  return (
    <div>
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2xl">Todos</h1>
        <Link
          href="/new"
          className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
        >
          New
        </Link>
      </header>
      <ul className="pl-4">
        {todos.map((todo) => (
          <TodoItem key={todo.id} {...todo} toggleTodo={toggleToDo}></TodoItem>
        ))}
      </ul>
    </div>
  );
}

function getTodos() {
  return prisma.todo.findMany();
}
