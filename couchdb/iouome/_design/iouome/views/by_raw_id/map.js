function (doc) {
  if (doc.raw && doc.raw.id_str) emit(doc.raw.id_str);
}
