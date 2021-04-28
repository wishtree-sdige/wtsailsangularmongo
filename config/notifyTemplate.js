/**
 * Notification Templates configuration
 * (sails.config.notifyTemplates)
 * @description :: Configuration for notification templates.
 */


module.exports.notifyTemplates = {

  UpdateProfile: {
    web: '<li class="timeline-item"><div class="timeline-icon"><span class="fa fa-envelope text-sBlue"></span></div><div class="media-body"><h5 class="media-heading"> Timeline Post <small class="notifyTime"><img class="notifyBadge" src="/favicon.ico" height="13" width="13" ><time class="timeago" data-toggle="tooltip" title="{{displayDate}}" datetime="{{createdAt}}"></time></small></h5><p> Profile updated sucessfully.</p><div class="media-links"></div></div></li>',
    email: '',
  },
};
