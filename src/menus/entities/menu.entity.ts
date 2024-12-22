export class Menu {
  id: string;  // ID menu, disesuaikan dengan tipe string yang menggunakan UUID
  name: string; // Nama menu
  parentId?: string | null; // Parent ID menu, bisa null jika menu adalah root
  depth: number; // Kedalaman menu (level menu dalam hierarki)
  createdAt: Date; // Waktu pembuatan menu
  updatedAt: Date; // Waktu terakhir menu diperbarui
}
