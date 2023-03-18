var express = require('express');
var router = express.Router();
const Contact = require('../models/contacts');
const sequenceGenerator = require('./sequenceGenerator');

module.exports = router;




var router = express.Router();

//GET
// router.get('/', (req, res, next) => {
//     // call the Contact model find() method to get all contacts in the collection
//     Contact.find()
//     .then(allContacts => {
//         res.status(200).json({
//             message: 'Contact added successfully',
//             Contact: allContacts
//         })
//     })
//     .catch(error => {
//        res.status(500).json({
//           message: 'An error occurred',
//           error: error
//         });
//     });
//  });
router.get('/', (req, res, next) => {
    Contact.find()
      .populate('group')
      .then(contacts => {
        res.status(200).json({
            message: 'Contacts fetched successfully!',
            contacts: contacts
          });
      })
      .catch(error => {
        res.status(500).json({
          message: 'An error occurred',
          error: error
        });
      });
  });
//POST
router.post('/', (req, res, next) => {
    const maxContactId = sequenceGenerator.nextId("contacts");

    const contact = new Contact({
      id: maxContactId,
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      imageUrl: req.body.imageUrl
    });
  
    contact.save()
      .then(createdContact => {
        res.status(201).json({
          message: 'Contact added successfully',
          contact: createdContact
        });
      })
      .catch(error => {
         res.status(500).json({
            message: 'An error occurred',
            error: error
          });
      });
  });

//PUT
router.put('/:id', (req, res, next) => {
    Contact.findOne({ id: req.params.id })
      .then(contact => {
        
        contact.name = req.body.name;
        contact.email = req.body.email;
        contact.phone = req.body.phone;
        contact.imageUrl = req.body.imageUrl;
  
        contact.updateOne({ id: req.params.id }, contact)
          .then(result => {
            res.status(204).json({
              message: 'Contact updated successfully'
            })
          })
          .catch(error => {
             res.status(500).json({
             message: 'An error occurred',
             error: error
           });
          });
      })
      .catch(error => {
        res.status(500).json({
          message: 'Contact not found.',
          error: { contact: 'Contact not found'}
        });
      });
  });

  //DELETE
  router.delete("/:id", (req, res, next) => {
    Contact.findOne({ id: req.params.id })
      .then(contact => {
        contact.deleteOne({ id: req.params.id })
          .then(result => {
            res.status(204).json({
              message: "Contact deleted successfully"
            });
          })
          .catch(error => {
             res.status(500).json({
             message: 'An error occurred',
             error: error
           });
          })
      })
      .catch(error => {
        res.status(500).json({
          message: 'Contact not found.',
          error: { Contact: 'Contact not found'}
        });
      });
  });
  
module.exports = router;