```
mutation{
  addClient(name:"Jay", email:"jay.lingelbach@gmail.com", phone:"555-556-5566") {
    id
    name
    phone
    email
  }
}

mutation {
  deleteClient(id:"67e459e3f0a04abad200edab") {
    name
  }
}

{
  clients{
    id,
    name
  }
}

mutation {
  addProject(clientId:"67e45babd011129043239ddc",name:"Jay's first project", description:"A description", status:new) {
    id
    name
    description
    status
  }
}

{
  projects{
    id
    name
    description
    client{
      id
      name
      email
    }
  }
}


mutation {
  deleteProject(id:"67e47ebeb25f5e01151a2e4c"){
    id
  }
}

mutation {
  updateProject(id:"67e47fc1b25f5e01151a2e4f", name:"Updated", description:"Updated Description", status:progress) {
    id
  }
}
```
