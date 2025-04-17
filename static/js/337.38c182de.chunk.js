"use strict";(self.webpackChunkproviders_frontend=self.webpackChunkproviders_frontend||[]).push([[337],{322:(e,t,a)=>{a.d(t,{A:()=>m});var n=a(540),r=a(767),l=a(976);const s=function(){var e=(0,r.zy)().pathname.split("/").filter((function(e){return e})),t={dashboard:"Дашборд",orders:"Список ордеров",wallet:"Кошелек",requisites:"Реквизиты",reports:"Отчёты"};return 0===e.length?n.createElement("nav",{className:"mb-2 sm:mb-4","aria-label":"Breadcrumbs"},n.createElement("ol",{className:"flex items-center text-xs sm:text-sm text-gray-500"},n.createElement("li",null,n.createElement("span",{className:"font-medium text-gray-700"},"Дашборд")))):n.createElement("nav",{className:"mb-2 sm:mb-4 overflow-x-auto pb-1 whitespace-nowrap","aria-label":"Breadcrumbs"},n.createElement("ol",{className:"flex items-center space-x-1 text-xs sm:text-sm text-gray-500"},n.createElement("li",null,n.createElement(l.N_,{to:"/",className:"hover:text-blue-600 transition-colors duration-200 flex items-center","aria-label":"Перейти на главную"},n.createElement("span",{className:"material-icons-outlined text-base sm:text-lg"},"home"))),e.map((function(a,r){var s="/".concat(e.slice(0,r+1).join("/")),m=r===e.length-1;return n.createElement(n.Fragment,{key:s},n.createElement("li",null,n.createElement("span",{className:"material-icons-outlined text-gray-400",style:{fontSize:"12px"}},"chevron_right")),n.createElement("li",null,m?n.createElement("span",{className:"font-medium text-gray-700"},t[a]||a):n.createElement(l.N_,{to:s,className:"hover:text-blue-600 transition-colors duration-200"},t[a]||a)))}))))},m=function(e){var t=e.title,a=e.actions;return n.createElement("div",{className:"mb-6 sticky top-20 md:top-0 bg-gray-50 pt-2 pb-4 z-10"},n.createElement(s,null),n.createElement("div",{className:"flex flex-col sm:flex-row justify-between items-start sm:items-center"},n.createElement("h1",{className:"text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-0"},t),a&&n.createElement("div",{className:"flex space-x-2 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0"},a)))}},337:(e,t,a)=>{a.r(t),a.d(t,{default:()=>o});var n=a(540),r=a(322);function l(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,n=Array(t);a<t;a++)n[a]=e[a];return n}var s=[{id:"1",date:"2023-10-15T14:32:10",amount:"1250 USDT",txHash:"mFgXHXS6vYfgZx5D5QQ5pQVc5cPkCR5p8WJ4pYbmtm8=",status:"completed"},{id:"2",date:"2023-10-14T09:18:45",amount:"750 USDT",txHash:"jjjnAYC525wk6y56YPF5aeD9VdKV82sshZQS7MrXXSA=",status:"completed"},{id:"3",date:"2023-10-12T16:45:22",amount:"1200 USDT",txHash:"TfKXS5KnXf3kvbOY5ygL51r8Uf3GiJTJU6ZcAjsUMcw=",status:"pending"},{id:"4",date:"2023-10-10T11:55:37",amount:"120 USDT",txHash:"qf9YLNr56feAptWKwJ3wr77VEzNbHKCkL6e8C3aHcZ8=",status:"completed"},{id:"5",date:"2023-10-08T08:25:19",amount:"500 USDT",txHash:"YLr9GJTjLcKD9v5Xjs2pmKxZLPgcabsvBNp3pw3HN4U=",status:"failed"}],m=function(e){var t,a,r=e.address,s=(t=(0,n.useState)(!1),a=2,function(e){if(Array.isArray(e))return e}(t)||function(e,t){var a=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=a){var n,r,l,s,m=[],c=!0,o=!1;try{if(l=(a=a.call(e)).next,0===t){if(Object(a)!==a)return;c=!1}else for(;!(c=(n=l.call(a)).done)&&(m.push(n.value),m.length!==t);c=!0);}catch(e){o=!0,r=e}finally{try{if(!c&&null!=a.return&&(s=a.return(),Object(s)!==s))return}finally{if(o)throw r}}return m}}(t,a)||function(e,t){if(e){if("string"==typeof e)return l(e,t);var a={}.toString.call(e).slice(8,-1);return"Object"===a&&e.constructor&&(a=e.constructor.name),"Map"===a||"Set"===a?Array.from(e):"Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)?l(e,t):void 0}}(t,a)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),m=s[0],c=s[1],o=function(){navigator.clipboard.writeText(r).then((function(){c(!0),setTimeout((function(){return c(!1)}),2e3)}))};return n.createElement("div",{className:"bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-lg p-6 text-white relative overflow-hidden"},n.createElement("div",{className:"absolute -right-10 -top-10 opacity-10"},n.createElement("span",{className:"material-icons-outlined text-9xl"},"account_balance_wallet")),n.createElement("h3",{className:"text-xl font-bold mb-1"},"Адрес вашего кошелька"),n.createElement("p",{className:"text-blue-100 text-sm mb-4"},"Используйте этот адрес для получения средств"),n.createElement("div",{className:"bg-black/30 p-4 rounded-xl backdrop-blur-sm flex items-center justify-between mb-4 relative"},n.createElement("div",{className:"font-mono text-sm md:text-base overflow-hidden text-ellipsis"},r),n.createElement("button",{onClick:o,onKeyDown:function(e){"Enter"!==e.key&&" "!==e.key||o()},className:"ml-2 bg-white/20 hover:bg-white/30 p-2 rounded-lg backdrop-blur-sm transition-all duration-200","aria-label":"Копировать адрес кошелька",tabIndex:0},n.createElement("span",{className:"material-icons-outlined text-white"},m?"check":"content_copy")),m&&n.createElement("div",{className:"absolute -top-10 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-3 py-1 rounded text-sm animate-fade-in-down"},"Скопировано!")),n.createElement("div",{className:"flex justify-between text-sm"},n.createElement("div",null,n.createElement("span",{className:"text-blue-200"},"Сеть:")," ",n.createElement("span",{className:"font-semibold"},"TON")),n.createElement("div",null,n.createElement("span",{className:"text-blue-200"},"Валюта:")," ",n.createElement("span",{className:"font-semibold"},"USDT"))))},c=function(e){var t,a,r=e.transaction;return n.createElement("tr",{className:"border-b border-gray-100 hover:bg-gray-50 transition-colors duration-150"},n.createElement("td",{className:"py-4 px-4"},n.createElement("span",{className:"font-medium"},(t=r.date,a=new Date(t),new Intl.DateTimeFormat("ru-RU",{day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit"}).format(a)))),n.createElement("td",{className:"py-4 px-4"},n.createElement("span",{className:"font-semibold"},r.amount)),n.createElement("td",{className:"py-4 px-4"},n.createElement("div",{className:"flex items-center"},n.createElement("span",{className:"font-mono text-sm text-gray-600 truncate max-w-[120px] md:max-w-[180px] lg:max-w-[250px]"},r.txHash),n.createElement("a",{href:"https://tonscan.org/tx/".concat(r.txHash),target:"_blank",rel:"noopener noreferrer",className:"ml-2 text-blue-500 hover:text-blue-700","aria-label":"Открыть транзакцию в обозревателе блокчейна"},n.createElement("span",{className:"material-icons-outlined text-sm"},"open_in_new")))),n.createElement("td",{className:"py-4 px-4"},n.createElement("span",{className:"px-3 py-1 rounded-full text-xs font-medium ".concat({completed:"bg-green-100 text-green-800",pending:"bg-yellow-100 text-yellow-800",failed:"bg-red-100 text-red-800"}[r.status])},{completed:"Выполнен",pending:"В обработке",failed:"Ошибка"}[r.status])))};const o=function(){return n.createElement("div",null,n.createElement(r.A,{title:"Кошелек"}),n.createElement("div",{className:"mb-8"},n.createElement(m,{address:"EQBIhPuWmjT7fP-VomuTWnW-5RMDAQkWDFv_X4GGmNDQCCnW"})),n.createElement("div",{className:"bg-white rounded-xl shadow-md p-6"},n.createElement("h2",{className:"text-lg font-semibold text-gray-800 mb-4"},"История начислений"),n.createElement("div",{className:"overflow-x-auto"},n.createElement("table",{className:"min-w-full"},n.createElement("thead",{className:"bg-gray-50"},n.createElement("tr",null,n.createElement("th",{className:"py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"},"Дата и время"),n.createElement("th",{className:"py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"},"Сумма"),n.createElement("th",{className:"py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"},"Хеш транзакции"),n.createElement("th",{className:"py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"},"Статус"))),n.createElement("tbody",{className:"divide-y divide-gray-100"},s.map((function(e){return n.createElement(c,{key:e.id,transaction:e})}))))),0===s.length&&n.createElement("div",{className:"py-8 text-center text-gray-500"},n.createElement("span",{className:"material-icons-outlined text-3xl mb-2"},"inbox"),n.createElement("p",null,"История транзакций пуста"))))}}}]);