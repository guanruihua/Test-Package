import React, { FC, useState, useEffect } from 'react';
import { observer, inject } from "mobx-react";
import { Form } from 'antd';
import { ARForm, ARFilter, ARTable, ARModal } from '@/components';
import { PlusOutlined } from '@ant-design/icons';
import { Input, Button } from 'antd';
import { injectIntl } from 'react-intl';
import { iModalProps } from '@/components/ARModal/type';
import { Common, Utils } from '@/assets';
import { ARFilterType, ARTableType } from '@/assets/type/ARComponent';
const FormItem: any = Form.Item;
const ARFormItem: any = ARForm.Item;
const ARModalFormItem: any = ARModal.Item;
const namespace: string = 'TestStore';

const Index = () => {
	return <div>table</div>
}

export default injectIntl(Index)