// Service layer cho sách: hiện tại dùng mock, sau này chỉ cần đổi sang fetch API thật
import { fetchFeaturedBooks as fetchFeaturedBooksMock } from "./mockBooks.js";

export async function fetchFeaturedBooks() {
  // TODO: sau này thay bằng fetch("/api/books") ...
  return fetchFeaturedBooksMock();
}


