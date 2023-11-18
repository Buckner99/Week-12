const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

const PORT = 3000;

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.use('/api', router);

server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`);
});
$(document).ready(function() {
    // Load contacts on page load
    loadContacts();
  
    // Handle form submission
    $('#contactForm').submit(function(e) {
      e.preventDefault();
      const contactName = $('#contactName').val();
      const contactPhone = $('#contactPhone').val();
      const contactAddress = $('#contactAddress').val();
      addContact(contactName, contactPhone, contactAddress);
    });
  
    // Function to load contacts from the API
    function loadContacts() {
      $.get('http://localhost:3000/api/contacts', function(contacts) {
        displayContacts(contacts);
      });
    }
  
    // Function to display contacts in the UI
    function displayContacts(contacts) {
      $('#contactList').empty();
      contacts.forEach(function(contact) {
        const listItem = `<li class="list-group-item">
                            <strong>Name:</strong> ${contact.name}<br>
                            <strong>Phone:</strong> ${contact.phone}<br>
                            <strong>Address:</strong> ${contact.address}
                            <button class="btn btn-danger btn-sm float-right" onclick="deleteContact(${contact.id})">Delete</button>
                          </li>`;
        $('#contactList').append(listItem);
      });
    }
  
    // Function to add a new contact
    function addContact(name, phone, address) {
      $.post('http://localhost:3000/api/contacts', { name, phone, address }, function() {
        loadContacts();
        $('#contactForm')[0].reset();
      });
    }
  
    // Function to delete a contact
    window.deleteContact = function(id) {
      $.ajax({
        url: `http://localhost:3000/api/contacts/${id}`,
        type: 'DELETE',
        success: function() {
          loadContacts();
        }
      });
    };
  });
  