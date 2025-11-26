
export const fetchItems = async () => {
    const response = await fetch(`http://192.168.8.105:8080/api/items`);
    const data = await response.json()
    console.log(data)
    return data;
}