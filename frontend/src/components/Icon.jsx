const ICONS = {
  home: "M3 9.5l9-7 9 7V20a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z",
  briefcase: "M4 8h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z M8 8V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2 M3 13h18",
  clipboard: "M9 3h6a1 1 0 0 1 1 1v1H8V4a1 1 0 0 1 1-1z M7 5H6a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1h-1 M8 11h8 M8 15h8 M8 19h5",
  book: "M4 19.5A2.5 2.5 0 0 1 6.5 17H20 M4 19.5A2.5 2.5 0 0 0 6.5 22H20V2H6.5A2.5 2.5 0 0 0 4 4.5v15z",
  star: "M12 2.5l2.95 6.28 6.92.94-5.06 4.83 1.33 6.87L12 17.98l-6.14 3.44 1.33-6.87-5.06-4.83 6.92-.94z",
  user: "M20 21v-1.5a5 5 0 0 0-5-5H9a5 5 0 0 0-5 5V21 M12 10.5a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
  logout: "M9 21H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3 M16 17l5-5-5-5 M21 12H9",
  search: "M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16z M21 21l-4.3-4.3",
  filter: "M4 5h16 M7 12h10 M10 19h4",
  calendar: "M7 3v3 M17 3v3 M4 9h16 M5 6h14a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1z",
  plus: "M12 5v14 M5 12h14",
  x: "M18 6L6 18 M6 6l12 12",
  check: "M20 6L9 17l-5-5",
  chevronRight: "M9 18l6-6-6-6",
  chevronLeft: "M15 18l-6-6 6-6",
  chevronDown: "M6 9l6 6 6-6",
  clock: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z M12 7v5l3.5 2",
  bell: "M6 9a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6 M10.5 20a1.5 1.5 0 0 0 3 0",
  mail: "M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z M3.5 6.5l8.5 6 8.5-6",
  phone: "M6.6 10.8a15 15 0 0 0 6.6 6.6l2.2-2.2a1.3 1.3 0 0 1 1.4-.3c1.1.4 2.3.6 3.5.6a1.3 1.3 0 0 1 1.3 1.3V20a1.3 1.3 0 0 1-1.3 1.3C10.6 21.3 2.7 13.4 2.7 3.7A1.3 1.3 0 0 1 4 2.4h3.2a1.3 1.3 0 0 1 1.3 1.3c0 1.2.2 2.4.6 3.5a1.3 1.3 0 0 1-.3 1.4z",
  building: "M4 21V4a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v17 M15 9h4a1 1 0 0 1 1 1v11 M9 8h1 M9 12h1 M9 16h1 M2 21h20",
  mapPin: "M12 21s7-6.2 7-11.5a7 7 0 1 0-14 0C5 14.8 12 21 12 21z M12 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z",
  dollar: "M12 2v20 M17 6.5c0-1.9-2.2-3-5-3s-5 1.2-5 3 2.2 3 5 3 5 1.1 5 3-2.2 3-5 3-5-1.1-5-3",
  arrowLeft: "M19 12H5 M12 19l-7-7 7-7",
  menu: "M4 6h16 M4 12h16 M4 18h16",
  download: "M12 3v13 M7 11l5 5 5-5 M4 21h16",
  edit: "M12 20h9 M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z",
  trending: "M23 6l-9.5 9.5-5-5L1 18 M17 6h6v6",
  clipboardCheck: "M9 3h6a1 1 0 0 1 1 1v1H8V4a1 1 0 0 1 1-1z M7 5H6a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1h-1 M9 13l2 2 4-4",
  info: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z M12 11v5 M12 8v.01",
  eye: "M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"
};

function Icon({ icon = "info", size = 20, color = "currentColor", strokeWidth = 2 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ display: "block", flexShrink: 0 }}
    >
      <path d={ICONS[icon] || ICONS.info} />
    </svg>
  );
}

export default Icon;
