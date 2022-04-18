/*eslint comma-dangle: ["error", "always-multiline"]*/
import { Mail, Home, Layers, Package, PlusSquare, FileText, Circle, User, DollarSign, Info } from 'react-feather'

export default [
  {
    id: 'companies',
    title: 'Companies',
    icon: <Layers size={20} />,
    navLink: '/companies',
  },
  {
    id: 'product',
    title: 'Products',
    icon: <Package size={20} />,

    children: [
      {
        id: 'add-product',
        title: 'Add Product',
        icon: <Circle size={20} />,
        navLink: '/add-product',
      },
      {
        id: 'products',
        title: 'Products',
        icon: <Circle size={20} />,
        navLink: '/products',
      },
    ],
  },
  {
    id: 'employee',
    title: 'Employees',
    icon: <User size={20} />,
    children: [
      {
        id: 'employees',
        title: 'List Employees',
        icon: <Circle size={20} />,
        navLink: '/employees',
      },
    ],
  },
  {
    id: 'welcome',
    title: 'Welcome Page',
    icon: <FileText size={20} />,
    children: [
      {
        id: 'section-1',
        title: 'Section 1',
        icon: <Circle size={12} />,
        children: [
          {
            id: 'nl',
            title: 'NL',
            icon: <Circle size={12} />,
            navLink: '/add-content?pageId=welcome&sectionNum=1&language=nl',
          },
          {
            id: 'de',
            title: 'DE',
            icon: <Circle size={12} />,
            navLink: '/add-content?pageId=welcome&sectionNum=1&language=de',
          },
          {
            id: 'en',
            title: 'EN',
            icon: <Circle size={12} />,
            navLink: '/add-content?pageId=welcome&sectionNum=1&language=en',
          },
        ],
      },
      {
        id: 'section-2',
        title: 'Section 2',
        icon: <Circle size={12} />,
        children: [
          {
            id: 'nl',
            title: 'NL',
            icon: <Circle size={12} />,
            navLink: '/add-content?pageId=welcome&sectionNum=2&language=nl',
          },
          {
            id: 'de',
            title: 'DE',
            icon: <Circle size={12} />,
            navLink: '/add-content?pageId=welcome&sectionNum=2&language=de',
          },
          {
            id: 'en',
            title: 'EN',
            icon: <Circle size={12} />,
            navLink: '/add-content?pageId=welcome&sectionNum=2&language=en',
          },
        ],
      },
      {
        id: 'section-3',
        title: 'Section 3',
        icon: <Circle size={12} />,
        children: [
          {
            id: 'nl',
            title: 'NL',
            icon: <Circle size={12} />,
            navLink: '/add-content?pageId=welcome&sectionNum=3&language=nl',
          },
          {
            id: 'de',
            title: 'DE',
            icon: <Circle size={12} />,
            navLink: '/add-content?pageId=welcome&sectionNum=3&language=de',
          },
          {
            id: 'en',
            title: 'EN',
            icon: <Circle size={12} />,
            navLink: '/add-content?pageId=welcome&sectionNum=3&language=en',
          },
        ],
      },
    ],
  },
  {
    id: 'visitors',
    title: 'Visitors Page',
    icon: <FileText size={20} />,
    children: [
      {
        id: 'section-1',
        title: 'Section 1',
        icon: <Circle size={12} />,
        children: [
          {
            id: 'nl',
            title: 'NL',
            icon: <Circle size={12} />,
            navLink: '/add-content?pageId=visitors&sectionNum=1&language=nl',
          },
          {
            id: 'de',
            title: 'DE',
            icon: <Circle size={12} />,
            navLink: '/add-content?pageId=visitors&sectionNum=1&language=de',
          },
          {
            id: 'en',
            title: 'EN',
            icon: <Circle size={12} />,
            navLink: '/add-content?pageId=visitors&sectionNum=1&language=en',
          },
        ],
      },
      {
        id: 'section-2',
        title: 'Section 2',
        icon: <Circle size={12} />,
        children: [
          {
            id: 'nl',
            title: 'NL',
            icon: <Circle size={12} />,
            navLink: '/add-content?pageId=visitors&sectionNum=2&language=nl',
          },
          {
            id: 'de',
            title: 'DE',
            icon: <Circle size={12} />,
            navLink: '/add-content?pageId=visitors&sectionNum=2&language=de',
          },
          {
            id: 'en',
            title: 'EN',
            icon: <Circle size={12} />,
            navLink: '/add-content?pageId=visitors&sectionNum=2&language=en',
          },
        ],
      },
      {
        id: 'section-3',
        title: 'Section 3',
        icon: <Circle size={12} />,
        children: [
          {
            id: 'nl',
            title: 'NL',
            icon: <Circle size={12} />,
            navLink: '/add-content?pageId=visitors&sectionNum=3&language=nl',
          },
          {
            id: 'de',
            title: 'DE',
            icon: <Circle size={12} />,
            navLink: '/add-content?pageId=visitors&sectionNum=3&language=de',
          },
          {
            id: 'en',
            title: 'EN',
            icon: <Circle size={12} />,
            navLink: '/add-content?pageId=visitors&sectionNum=3&language=en',
          },
        ],
      },
      {
        id: 'section-4',
        title: 'Section 4',
        icon: <Circle size={12} />,
        children: [
          {
            id: 'nl',
            title: 'NL',
            icon: <Circle size={12} />,
            navLink: '/add-content?pageId=visitors&sectionNum=4&language=nl',
          },
          {
            id: 'de',
            title: 'DE',
            icon: <Circle size={12} />,
            navLink: '/add-content?pageId=visitors&sectionNum=4&language=de',
          },
          {
            id: 'en',
            title: 'EN',
            icon: <Circle size={12} />,
            navLink: '/add-content?pageId=visitors&sectionNum=4&language=en',
          },
        ],
      },
    ],
  },
  {
    id: 'business',
    title: 'Business Page',
    icon: <FileText size={20} />,
    children: [
      {
        id: 'section-1',
        title: 'Section 1',
        icon: <Circle size={12} />,
        children: [
          {
            id: 'nl',
            title: 'NL',
            icon: <Circle size={12} />,
            navLink: '/add-content?pageId=business&sectionNum=1&language=nl',
          },
          {
            id: 'de',
            title: 'DE',
            icon: <Circle size={12} />,
            navLink: '/add-content?pageId=business&sectionNum=1&language=de',
          },
          {
            id: 'en',
            title: 'EN',
            icon: <Circle size={12} />,
            navLink: '/add-content?pageId=business&sectionNum=1&language=en',
          },
        ],
      },
    ],
  },
  {
    id: 'contact',
    title: 'Contact Page',
    icon: <FileText size={20} />,
    children: [
      {
        id: 'section-1',
        title: 'Section 1',
        icon: <Circle size={12} />,
        children: [
          {
            id: 'nl',
            title: 'NL',
            icon: <Circle size={12} />,
            navLink: '/add-content?pageId=contact&sectionNum=1&language=nl',
          },
          {
            id: 'de',
            title: 'DE',
            icon: <Circle size={12} />,
            navLink: '/add-content?pageId=contact&sectionNum=1&language=de',
          },
          {
            id: 'en',
            title: 'EN',
            icon: <Circle size={12} />,
            navLink: '/add-content?pageId=contact&sectionNum=1&language=en',
          },
        ],
      },
      {
        id: 'section-2',
        title: 'Section 2',
        icon: <Circle size={12} />,
        children: [
          {
            id: 'nl',
            title: 'NL',
            icon: <Circle size={12} />,
            navLink: '/add-content?pageId=contact&sectionNum=2&language=nl',
          },
          {
            id: 'de',
            title: 'DE',
            icon: <Circle size={12} />,
            navLink: '/add-content?pageId=contact&sectionNum=2&language=de',
          },
          {
            id: 'en',
            title: 'EN',
            icon: <Circle size={12} />,
            navLink: '/add-content?pageId=contact&sectionNum=2&language=en',
          },
        ],
      },
    ],
  },
  {
    id: 'page-seciton',
    title: 'Page Sections',
    icon: <FileText size={20} />,
    children: [
      {
        id: 'list-page-sections',
        title: 'Page Sections List',
        icon: <Circle size={20} />,
        navLink: '/list-page-sections',
      },
    ],
  },
  {
    id: 'page-key-value',
    title: 'Page Key Values',
    icon: <FileText size={20} />,
    children: [
      {
        id: 'list-page-key-values',
        title: 'List Page Key Values',
        icon: <Circle size={12} />,
        navLink: '/page-key-values',
      },
      {
        id: 'add-page-key-value',
        title: 'Add Page Key Value',
        icon: <Circle size={12} />,
        navLink: '/add-page-key-value',
      },
    ],
  },
  {
    id: 'sponsor',
    title: 'Sponsors',
    icon: <DollarSign size={20} />,
    children: [
      {
        id: 'add-sponsor',
        title: 'Add Sponsor',
        icon: <Circle size={20} />,
        navLink: '/add-sponsor',
      },
      {
        id: 'list-sponsors',
        title: 'List Sponsors',
        icon: <Circle size={20} />,
        navLink: '/sponsors',
      },
    ],
  },
  {
    id: 'contact-info',
    title: 'Contacts Info',
    icon: <Info size={20} />,
    children: [
      {
        id: 'contact-info-list',
        title: 'Contact Info List',
        icon: <Circle size={20} />,
        navLink: '/list-contact-info',
      },
    ],
  },
]
