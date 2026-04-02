const db = require('../config/db');

const getApplications = async (req, res) => {
  try {
    const { status, search } = req.query;

    let query = `
      SELECT id, user_id, company_name, role_title, location, status, application_date, job_link, notes, created_at, updated_at
      FROM applications
      WHERE user_id = ?
    `;

    const params = [req.user.id];

    if (status) {
      query += ` AND status = ?`;
      params.push(status);
    }

    if (search) {
      query += ` AND (company_name LIKE ? OR role_title LIKE ?)`;
      params.push(`%${search}%`, `%${search}%`);
    }

    query += ` ORDER BY created_at DESC`;

    const [applications] = await db.query(query, params);

    return res.status(200).json({
      applications,
    });
  } catch (error) {
    console.error('Get applications error:', error);

    return res.status(500).json({
      message: 'Internal server error.',
    });
  }
};

const getApplicationById = async (req, res) => {
  try {
    const { id } = req.params;

    const [applications] = await db.query(
      `SELECT id, user_id, company_name, role_title, location, status, application_date, job_link, notes, created_at, updated_at
       FROM applications
       WHERE id = ? AND user_id = ?`,
      [id, req.user.id]
    );

    if (applications.length === 0) {
      return res.status(404).json({
        message: 'Application not found.',
      });
    }

    return res.status(200).json({
      application: applications[0],
    });
  } catch (error) {
    console.error('Get application by id error:', error);

    return res.status(500).json({
      message: 'Internal server error.',
    });
  }
};

const createApplication = async (req, res) => {
  try {
    const {
      company_name,
      role_title,
      location,
      status,
      application_date,
      job_link,
      notes,
    } = req.body;

    if (!company_name || !role_title) {
      return res.status(400).json({
        message: 'Company name and role title are required.',
      });
    }

    const allowedStatuses = ['Applied', 'Interview', 'Offer', 'Rejected'];

    const finalStatus = status || 'Applied';

    if (!allowedStatuses.includes(finalStatus)) {
      return res.status(400).json({
        message: 'Invalid status value.',
      });
    }

    const [result] = await db.query(
      `INSERT INTO applications
      (user_id, company_name, role_title, location, status, application_date, job_link, notes)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        req.user.id,
        company_name,
        role_title,
        location || null,
        finalStatus,
        application_date || null,
        job_link || null,
        notes || null,
      ]
    );

    const [newApplicationRows] = await db.query(
      `SELECT id, user_id, company_name, role_title, location, status, application_date, job_link, notes, created_at, updated_at
       FROM applications
       WHERE id = ? AND user_id = ?`,
      [result.insertId, req.user.id]
    );

    return res.status(201).json({
      message: 'Application created successfully.',
      application: newApplicationRows[0],
    });
  } catch (error) {
    console.error('Create application error:', error);

    return res.status(500).json({
      message: 'Internal server error.',
    });
  }
};

const updateApplication = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      company_name,
      role_title,
      location,
      status,
      application_date,
      job_link,
      notes,
    } = req.body;

    const allowedStatuses = ['Applied', 'Interview', 'Offer', 'Rejected'];

    if (status && !allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: 'Invalid status value.',
      });
    }

    const [existing] = await db.query(
      `SELECT id FROM applications WHERE id = ? AND user_id = ?`,
      [id, req.user.id]
    );

    if (existing.length === 0) {
      return res.status(404).json({
        message: 'Application not found.',
      });
    }

    await db.query(
      `UPDATE applications
       SET company_name = ?, role_title = ?, location = ?, status = ?, application_date = ?, job_link = ?, notes = ?, updated_at = CURRENT_TIMESTAMP
       WHERE id = ? AND user_id = ?`,
      [
        company_name,
        role_title,
        location,
        status,
        application_date,
        job_link,
        notes,
        id,
        req.user.id,
      ]
    );

    const [updatedRows] = await db.query(
      `SELECT id, user_id, company_name, role_title, location, status, application_date, job_link, notes, created_at, updated_at
       FROM applications
       WHERE id = ? AND user_id = ?`,
      [id, req.user.id]
    );

    return res.status(200).json({
      message: 'Application updated successfully.',
      application: updatedRows[0],
    });
  } catch (error) {
    console.error('Update application error:', error);

    return res.status(500).json({
      message: 'Internal server error.',
    });
  }
};

const deleteApplication = async (req, res) => {
  try {
    const { id } = req.params;

    const [existing] = await db.query(
      `SELECT id FROM applications WHERE id = ? AND user_id = ?`,
      [id, req.user.id]
    );

    if (existing.length === 0) {
      return res.status(404).json({
        message: 'Application not found.',
      });
    }

    await db.query(
      `DELETE FROM applications WHERE id = ? AND user_id = ?`,
      [id, req.user.id]
    );

    return res.status(200).json({
      message: 'Application deleted successfully.',
    });
  } catch (error) {
    console.error('Delete application error:', error);

    return res.status(500).json({
      message: 'Internal server error.',
    });
  }
};

module.exports = {
  getApplications,
  getApplicationById,
  createApplication,
  updateApplication,
  deleteApplication,
};