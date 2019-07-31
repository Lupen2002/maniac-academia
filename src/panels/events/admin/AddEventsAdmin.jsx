// @flow

import * as React                            from "react";
import AppHeader                             from "../components/header/AppHeader";
import { isAdmin }                           from "../../../utils/admin";
import { Cell, Div, Panel }                  from "@vkontakte/vkui";
import type { VKWebAppGetUserInfoResult }    from "../../../types/vk";
import { FormLayout, Input }                 from "@vkontakte/vkui";
import connect                               from '@vkontakte/vkui-connect'
import { Checkbox, FormLayoutGroup, Button } from "@vkontakte/vkui";
import { storageGetEvent, storageSetEvent }  from "./utils/api";

type Props = {
  id: string,
  user: ?VKWebAppGetUserInfoResult,
  token: ?string,
  go: string => any
};

const AddEventsAdmin = (p: Props) => {
  const [name, setName] = React.useState(''),
        [price, setPrice] = React.useState(''),
        [time, setTime] = React.useState(0),
        [days, setDays] = React.useState<number[]>([]);

  const sendEvents = async () => {
    if (!p.token) throw Error('token is required!');

    const event = {name, price, time, days};
    const oldEvents = await storageGetEvent(p.token);

    if (!p.token) throw Error('token is required!');
    await storageSetEvent([...oldEvents, event], p.token);

    p.go("events-admin")
  };

  const onCheck = (day: number) => async (e: SyntheticEvent<HTMLInputElement>) => {
    const check = e.currentTarget.checked;
    if (check && !days.includes(day)) {
      setDays([...days, day])
    } else {
      setDays([...days.filter(d => d !== day)])
    }
  };

  const eventHandler = (type: string) => (e: SyntheticEvent<HTMLInputElement>) => {
    switch (type) {
      case 'name': {
        setName(e.currentTarget.value);
        return
      }
      case 'price': {
        const p = e.currentTarget.value;
        if (/^\d*$/g.test(p)) {
          setPrice(p);
        }
        return
      }
      case 'time': {
        setTime(e.currentTarget.value);
        return
      }
      case 'submit': {
        sendEvents();
        return
      }
    }
  };

  return (
    <Panel id={p.id}>
      <AppHeader active={p.id} isAdmin={isAdmin(p.user)} go={p.go}>
        Новое Событие
      </AppHeader>
      <FormLayout>
        <Input type="text" top="Название" value={name} onChange={eventHandler('name')} />
        <Input type="number" top="Цена" value={price} onChange={eventHandler('price')}/>
        <Input type="time" top="Время" value={time} onChange={eventHandler('time')}/>
        <FormLayoutGroup top="Повторять каждую неделю">
          <Checkbox checked={days.includes(0)} onClick={onCheck(0)}>Пн</Checkbox>
          <Checkbox checked={days.includes(1)} onClick={onCheck(1)}>Вт</Checkbox>
          <Checkbox checked={days.includes(2)} onClick={onCheck(2)}>Ср</Checkbox>
          <Checkbox checked={days.includes(3)} onClick={onCheck(3)}>Чт</Checkbox>
          <Checkbox checked={days.includes(4)} onClick={onCheck(4)}>Пт</Checkbox>
          <Checkbox checked={days.includes(5)} onClick={onCheck(5)}>Сб</Checkbox>
          <Checkbox checked={days.includes(6)} onClick={onCheck(6)}>Вс</Checkbox>
        </FormLayoutGroup>
        <Button size="xl" onClick={eventHandler('submit')}>Добавить</Button>
      </FormLayout>
      <Cell>
        <Div>{JSON.stringify({price, name, time, days})}</Div>
      </Cell>
    </Panel>
  );
};

export default AddEventsAdmin;
