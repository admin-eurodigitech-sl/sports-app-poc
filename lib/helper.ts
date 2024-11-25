export const parseCreatedAtToDate = (createdAt: string) => {
    const date = new Date(createdAt);

    return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
}