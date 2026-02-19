export function formatDate(dateInput: Date | string | number): string {
   if (!dateInput) return "No date";
    const date = new Date(dateInput);
    if (isNaN(date.getTime())) {
        throw new Error('Invalid date input');
    }
    const options: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric', year: 'numeric' };
    return date.toLocaleDateString(undefined, options);
}