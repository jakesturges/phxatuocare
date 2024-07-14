$(function() {
    // Check if the status parameter is present in the URL
   const urlParams = new URLSearchParams(window.location.search);
       if (urlParams.get('status') === 'success') {
           $('#booking-confirmation').show();
       }

   $("#date").datepicker({
       beforeShowDay: function(date) {
           var day = date.getDay();
           // Enable only Thursday (4), Friday (5), Saturday (6), and Sunday (0)
           return [(day == 5 || day == 6 || day == 0)];
       },
       onSelect: function(dateText) {
           var selectedDate = new Date(dateText);
           var day = selectedDate.getDay();
           var timeSlotSelect = $('#timeSlot');
           timeSlotSelect.empty(); // Clear previous options

           $.get('/unavailable-times', { date: dateText }, function(unavailableTimes) {
               if (day === 4) {
                   var option = new Option('3:00 PM', '15:00');
                   if (unavailableTimes.includes('15:00')) {
                       option.disabled = true;
                   }
                   timeSlotSelect.append(option);
               } else if (day === 5 || day === 6 || day === 0) {
                   var times = ['07:00', '10:00', '14:00'];
                   var labels = ['7:00 AM', '10:00 AM', '2:00 PM'];
                   for (var i = 0; i < times.length; i++) {
                       var option = new Option(labels[i], times[i]);
                       if (unavailableTimes.includes(times[i])) {
                           option.disabled = true;
                       }
                       timeSlotSelect.append(option);
                   }
               }
           });
       }
   });
});
