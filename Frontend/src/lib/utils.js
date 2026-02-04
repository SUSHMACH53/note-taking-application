export function formatDate(date) {
    return date.toLocaleDateString({
        month:"short",
        day:"numeric",
        year:"numeric"
    });
}