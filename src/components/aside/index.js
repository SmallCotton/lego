import React, { useState, useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { SettingContext } from '../../config/context';

export default () => {
  const context = useContext(SettingContext);
  const [openIdx, setOpenIdx] = useState(null);
  const parseMenu = () => {
    try {
      return JSON.parse(context.sideMenu);
    } catch (e) {
      return [];
    }
  };

  const icons = [
    'edit',
    'laptop',
    'gem',
    'th-list',
    'newspaper',
    'map',
    'network-wired',
    'desktop',
    'list',
    'parachute-box',
    'microsoft',
    'paper-plane',
    'cube'
  ];

  const renderSub = (list, index) => (
    <ul
      className="sub-list"
      style={{ height: (openIdx === index ? list.length * 40 : 0) + 'px' }}
    >
      {list.map((item, idx) => (
        <li className="item-v2" key={idx}>
          <NavLink
            activeClassName="active"
            to={item.url || ''}
            isActive={(match, location) => {
              let isMatch = !!match;
              if (!isMatch) {
                if (item.url && location.pathname !== '/') {
                  isMatch = item.url === location.pathname + location.search;
                }
              }
              // 展开相应子菜单
              if (isMatch && openIdx === null) {
                setOpenIdx(index);
              }
              return isMatch;
            }}
          >
            {item.name}
          </NavLink>
        </li>
      ))}
    </ul>
  );

  const FixedLink = props => {
    const { idx } = props;
    if (props.to) {
      return (
        <NavLink
          className="link"
          activeClassName="active"
          to={props.to}
          onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
        >
          {props.children}
        </NavLink>
      );
    } else {
      return (
        <div
          className={'link' + (openIdx === idx ? ' active' : '')}
          onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
        >
          {props.children}
        </div>
      );
    }
  };

  return (
    <aside className="frame-aside">
      <h1 className={!!context.name ? 'name-show' : ''}>
        <Link to="/">
          <i className="fas fa-cubes" />
          <span>{context.name || ''}</span>
        </Link>
      </h1>
      <ul className="side-menu">
        {parseMenu().map((v1, idx) => (
          <li className="item-v1" key={idx}>
            <FixedLink idx={idx} to={v1.url}>
              <i className={'icon fas fa-' + (v1.icon || icons[idx])} />
              <span>{v1.name}</span>
              <i className="arr fas fa-chevron-down" />
            </FixedLink>
            {v1.sub && renderSub(v1.sub, idx)}
          </li>
        ))}
      </ul>
    </aside>
  );
};
