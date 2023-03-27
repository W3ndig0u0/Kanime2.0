import axios from "axios";

const url = "https://api.consumet.org/anime/gogoanime/servers/spy-x-family-episode-1";
const data = async () => {
    try {
        const { data } = await axios.get(url);
        return data;
    } catch (err) {
        throw new Error(err.message);
    }
};
 
console.log(data);

