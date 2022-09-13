import { Client } from "./client";

const site = 'interno';
const api_url = "http://137.184.78.182:5501/graphql";

const apiService = new Client({ site, api_url });

export const siteCurren = async() => {
    return await apiService.siteCurren()
};

export const getList = async () => {
    return await apiService.getListsOfSite();
};

export const getItemsByListId = async (listId) => {
    return await apiService.getItemsByLIstId(listId);
}
