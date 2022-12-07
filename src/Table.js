import React from 'react'

const Table = ({data}) => {
  return (
    <div>
        <table class="table table-bordered table-hover">
  <thead>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Age</th>
      <th scope="col">Description</th>
    </tr>
  </thead>
  {data.map((i) => (
    <tbody class="table-group-divider">
    <tr>
      <td>{i.name}</td>
      <td>{i.age}</td>
      <td>{i.description}</td>
    </tr>
  </tbody>
   ))}
  
</table>
    </div>
  )
}

export default Table