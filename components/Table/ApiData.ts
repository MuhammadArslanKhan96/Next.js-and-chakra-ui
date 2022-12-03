'use'
import namor from 'namor' // namor used to generate random string

const range = (len:number) => {
  const arr = []
  for (let i = 0; i < len; i++) {
    arr.push(i)
  }
  return arr
}

const newPerson = (idx:number) => {
  const statusChance = Math.random()
  return {
    id: idx ,
    firstName: namor.generate({ words: 1, numbers: 0 }),
    lastName: namor.generate({ words: 1, numbers: 0 }),
    age: Math.floor(Math.random() * 30),
    visits: Math.floor(Math.random() * 100),
    progress: Math.floor(Math.random() * 100),
    status:
      statusChance > 0.66
        ? 'relationship'
        : statusChance > 0.33
        ? 'complicated'
        : 'single',
  }
}

export function data(...lens: number[]) {
  const makeDataLevel:any = (depth: number = 0) => {
    const len = lens[depth]
    return range(len).map((d,idx) => {
      return {
        ...newPerson(idx),
        subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
      }
    })
  }

  return makeDataLevel()
}

export const columns = [
  {
      Header: "",
      accessor: "id"
  },
  {
      Header: "Title",
      accessor: "firstName"
  },
  {
      Header: "Last Name",
      accessor: "lastName"
  },
  {
      Header: "Age",
      accessor: "age"
  },
  {
      Header: "Visits",
      accessor: "visits"
  },
  {
      Header: "Status",
      accessor: "status"
  },
  {
      Header: "Profile Progress",
      accessor: "progress"
  }
]