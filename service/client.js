'use strict';

export class Client {
    api_url = '';
    token = '';
    expiration = 0;

    constructor({site, api_url}) {

      if (api_url) {
           fetch(api_url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              query: `
                      mutation loginSite($site: String) {
                        loginSite(site:$site) {
                          expiration
                          access_token
                        }
                      }
                      `,
              variables: {
                  site,
              },
            }),
          })
            .then((res) => res.json())
            .then(({ data }) => {
              const { access_token = "", expiration = 0 } = data?.loginSite;
              this.token = access_token;
              this.expiration = expiration;
              this.api_url = api_url;
            });
          }
    }
  
    async siteCurren() {
          let response = await fetch(this.api_url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: this.token,
            },
            body: JSON.stringify({
              query: `
                          query {
                            siteCurrent {
                              id
                              name
                              displayName
                              token
                            }
                          }
                      `,
            }),
          })
         return response.json();   
    }
  
    async getListsOfSite() {
      try {
        let response = await fetch(this.api_url, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: this.token,
              },
              body: JSON.stringify({
                query: `
                      query {
                        getListBySiteId {
                          id
                          webUrl
                          displayName
                          lastModifiedDateTime
                          name
                        }
                      }`,
              }),
            })  
            return response.json()
      } catch(error) {
        console.error(error)
      }
    }

    async getItemsByLIstId(listId) {
      try {
        let response = await fetch(this.api_url, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: this.token,
              },
              body: JSON.stringify({
                query: `
                        query getItemsByLIstId($listId: String!){
                          getItemsByListId(listId: $listId) {
                            id
                            webUrl
                            lastModifiedDateTime
                            fields 
                          } 
                      }`,
               variables: {
                    listId
               }      
              }),
            })  
            return response.json()
      } catch(error) {
        console.error(error)
      }
    }
  }
  