// How to extract the first letter of the name
export const getInitials = (name: string) => {
  if (!name) return "NA"; // Return "NA" if name is empty or undefined
    const names = name.split(" ");
    const initials = names.map((n) => n.charAt(0).toUpperCase()).join("");
    return initials;
}