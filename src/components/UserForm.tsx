import React from 'react';

import { CreateUserInput } from '../../__generated__/globalTypes';
import UserPrivilegeSelect from './UserPrivilegeSelect';

import './UserForm.css';

interface Props {
  fields: Partial<CreateUserInput>;
  onChange: (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
}

export default function UserForm({ fields, onChange }: Props) {
  return (
    <div className="UserForm__form">
      {fields.hasOwnProperty('username') && (
        <label className="UserForm__label">
          <span className="UserForm__label_text">Username: </span>
          <input
            className="UserForm__input"
            name="username"
            type="text"
            onChange={onChange}
            value={fields.username || ''}
            placeholder="Username"
            required
          />
        </label>
      )}

      <label className="UserForm__label">
        <span className="UserForm__label_text">First Name: </span>
        <input
          className="UserForm__input"
          name="firstName"
          type="text"
          onChange={onChange}
          value={fields.firstName || ''}
          placeholder="First"
          required
        />
      </label>

      <label className="UserForm__label">
        <span className="UserForm__label_text">Last Name: </span>
        <input
          className="UserForm__input"
          name="lastName"
          type="text"
          onChange={onChange}
          value={fields.lastName || ''}
          placeholder="Last"
          required
        />
      </label>

      {fields.hasOwnProperty('email') && (
        <label className="UserForm__label">
          <span className="UserForm__label_text">Email: </span>
          <input
            className="UserForm__input"
            name="email"
            type="text"
            onChange={onChange}
            value={fields.email || ''}
            placeholder="Email"
            required
          />
        </label>
      )}

      <label className="UserForm__label">
        <span className="UserForm__label_text">Bio: </span>
        <textarea
          className="UserForm__input"
          name="bio"
          onChange={onChange}
          value={fields.bio || ''}
          placeholder="How did you start doing?"
          required
        />
      </label>

      <label className="UserForm__label">
        <span className="UserForm__label_text">Privilege Level: </span>
        <UserPrivilegeSelect className="UserForm__select" />
      </label>
    </div>
  );
}
