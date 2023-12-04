/**
 * This file is generated by Appinvento, also it can be overwritten by Appinvento.
 * Only fields name will be overwritten, if the field name will be changed.
 */
import { EmailTemplate } from 'models';

export async function getEmailTemplateById(id, options = {}) {
  const emailTemplate = await EmailTemplate.findById(id, options.projection, options);
  return emailTemplate;
}

export async function getOne(query, options = {}) {
  const emailTemplate = await EmailTemplate.findOne(query, options.projection, options);
  return emailTemplate;
}

export async function getEmailTemplateList(filter, options = {}) {
  const emailTemplate = await EmailTemplate.find(filter, options.projection, options);
  return emailTemplate;
}

export async function getEmailTemplateListWithPagination(filter, options = {}) {
  const emailTemplate = await EmailTemplate.paginate(filter, options);
  return emailTemplate;
}

export async function createEmailTemplate(body) {
  const emailTemplate = await EmailTemplate.create(body);
  return emailTemplate;
}

export async function updateEmailTemplate(filter, body, options = {}) {
  const emailTemplate = await EmailTemplate.findOneAndUpdate(filter, body, options);
  return emailTemplate;
}

export async function updateManyEmailTemplate(filter, body, options = {}) {
  const emailTemplate = await EmailTemplate.updateMany(filter, body, options);
  return emailTemplate;
}

export async function removeEmailTemplate(filter) {
  const emailTemplate = await EmailTemplate.findOneAndRemove(filter);
  return emailTemplate;
}

export async function removeManyEmailTemplate(filter) {
  const emailTemplate = await EmailTemplate.deleteMany(filter);
  return emailTemplate;
}
