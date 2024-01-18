$(document).ready(function () {
  var phoneNumber = "";

  setEntry = (number) => {
    phoneNumber = number;
    $("#entry").text(phoneNumber);

    if (phoneNumber.length > 0) $("#dialerDelete").show();
    else $("#dialerDelete").hide();
  };

  reset = () => {
    phoneNumber = "";
    setEntry("");
  };

  playTone = (filePath, loop) => {
    var control = $("#btnMuteUnmute").children("i")[0].classList;
    if (control.contains("bi-volume-mute")) return;

    var audio = new Audio(filePath);
    audio.loop = loop;
    audio.play();

    return audio;
  };

  $("button").click(function () {
    var val = $(this).data("value");

    if (val == undefined) return;

    if (val == "*") playTone("resources/audio/dtmf_star.mp3", false);
    else if (val == "#") playTone("resources/audio/dtmf_pound.mp3", false);
    else playTone("resources/audio/dtmf_" + val + ".mp3", false);

    setEntry(phoneNumber + val);
  });

  $("#dialerCall").click(function () {
    if (phoneNumber.length == 0) return;

    var ring = playTone("resources/audio/tone_ringing.mp3", true);

    alert("Calling " + phoneNumber + "...");

    if (ring != undefined) {
      ring.pause();
      ring.currentTime = 0;
    }

    reset();
  });

  $("#dialerDelete").click(function () {
    if (phoneNumber.length == 0) return;

    setEntry(phoneNumber.substring(0, phoneNumber.length - 1));
  });

  $("#btnMuteUnmute").click(function () {
    var icon = $(this).children("i")[0].classList;

    icon.toggle("bi-volume-mute");
    icon.toggle("bi-volume-up");
  });

  $("#btnLightDark").click(function () {
    // Get the icon reference so we can change it
    var icon = $(this).children("i")[0].classList;

    // Get the current document theme so we can change it
    var theme = document.documentElement.getAttribute("data-bs-theme");

    // Set the new theme
    if (theme == "light") {
      document.documentElement.setAttribute("data-bs-theme", "dark");
    } else {
      document.documentElement.setAttribute("data-bs-theme", "light");
    }

    // Set the new icon
    icon.toggle("bi-sun");
    icon.toggle("bi-moon");
  });

  reset();

  // enable tooltips
  $('[data-toggle="tooltip"]').tooltip();
});
