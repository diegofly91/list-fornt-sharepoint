import Head from 'next/head'
import { getList, siteCurren, getItemsByListId } from '../service/api_service'
import { useState, useEffect } from 'react'

export default function Home() {
  const [ list, setList ] = useState([]);
  const [ page, setPage ] = useState()
  const [ items, setItems ] = useState([])
  useEffect(() => {
    
     fetchData()
  }, [])

  const getItems = async (listId) => {
    setItems([])
    const { data } = await getItemsByListId(listId)
    console.log({ data })
    setItems(data.getItemsByListId.filter((item) => item !== null))
  }

  const fetchData = async () => {
    const { data } = await getList()
    const siteData = await siteCurren()
    setPage(siteData.data.siteCurrent)
    setList(data.getListBySiteId)
}

  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <button onClick={fetchData}>
          refresh
        </button>
        <h1 className="title">
          Welcome to <a>{page?.displayName}</a>
        </h1>
        <p className="description">
          Get started by editing
        </p>
        <div className="custom-select">
            <select 
            name="list"
            onChange={(event) => {
                  if(event.target.value){
                    getItems(event.target.value)
                  }
            }}
            >
              <option value="">seleccione las lista</option>
              {list?.map((item)=>{
                  return(<option value={item.id}>{item.name}</option>)
                })}
            </select>
       </div> 
        <div className="list">
            <h2>Items de la lista</h2>
            <ul>
              {items?.map((item) => {
                return(
                      <li id={item.id}>
                        <p><strong>{item.fields?.Title || item.fields?.FileLeafRef} - {item.fields?.ContentType}</strong></p>
                        <p>{item.webUrl}</p>
                      </li>
                )}
              )}
            </ul>
        </div>
      </main>

      <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel" className="logo" />
        </a>
      </footer>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .custom-select {
          max-width: 300px;
        }

        .custom-select select {
          border-radius: 5px;
          background: white;
          font-size: 20px;
          padding: 10px;
        }

        .list {
          display: flex;
          flex-direction:column; 
          width: 100%;
          max-width: calc(100% - 20px);
          margin: auto;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer img {
          margin-left: 0.5rem;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .title a {
          color: #0070f3;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
        }

        .title,
        .description {
          text-align: center;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          overflow-x: hidden;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}
