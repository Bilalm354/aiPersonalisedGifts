import { createTable } from "@/functions/db/createTable";

export default async function Page() {
  createTable();
  return <></>;
}
