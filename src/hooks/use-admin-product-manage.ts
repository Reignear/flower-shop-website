import { useState } from "react";

export const useAdminProductManage = () => {
  const [openDelete, setOpenDelete] = useState<string | null>(null);
  const [openUpdate, setOpenUpdate] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [search, setSearch] = useState("");
    const [openInsert, setOpenInsert] = useState(false);
  return {
    search,
    setSearch,
    openDelete,
    setOpenDelete,
    openUpdate,
    setOpenUpdate,
    activeCategory,
    setActiveCategory,
    openInsert,
    setOpenInsert,
  };
};
