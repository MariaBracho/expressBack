export default function findId(id: string, list: any[]) {
  list.find((item) => item.id?.includes(id));
}
