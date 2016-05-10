import { Slingshot } from 'meteor/edgee:slingshot';

Slingshot.fileRestrictions("assets", {
  allowedFileTypes: ["image/png", "image/jpeg", "image/gif"],
  maxSize: 10 * 1024 * 1024 // 10 MB (use null for unlimited).
});

Slingshot.fileRestrictions("profile", {
  allowedFileTypes: ["image/png", "image/jpeg", "image/gif"],
  maxSize: 1024 * 1024 // 1 MB (use null for unlimited).
});