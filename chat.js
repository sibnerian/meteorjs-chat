Messages = new Meteor.Collection("messages");

if (Meteor.isClient) {
  Template.chatBox.messages = function() {
    return Messages.find({}, {sort: {timestamp : -1}, limit: 18}).fetch().reverse();
  };

  Template.chatBox.events = {
    'submit' : function(e, tmpl) {
      e.preventDefault();
      console.log("Clicked submit!");

      var newMessage = {
        userName : tmpl.find("#userName").value,
        message : tmpl.find("#chatInput").value, 
        timestamp: (new Date()).getTime()
      };

      // clear out the old message

      if (newMessage.userName == "") {
        return alert("Missing username!")
      }
      if (newMessage.message == "") {
        return alert("Need a message");
      }
      var id = Messages.insert(newMessage);

      if(id)
        tmpl.find("#chatInput").value = "";


    }
  };

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
