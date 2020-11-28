import React, { useState } from 'react';
import {getCookie, deleteCookie, upperCaseFirst} from './util';

const deleteUser = () => {
    deleteCookie("_id", "/")
    deleteCookie("mail", "/")
  }

export function Deconnection(setConnected, history) {
  deleteUser()
  setConnected(null)
  history.push('/')
}