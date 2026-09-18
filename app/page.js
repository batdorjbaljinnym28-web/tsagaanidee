'use client';

import { useMemo, useState } from 'react';
import './style.css';

const products = [
  {
    id: 1,
    name: 'Хөвсгөлийн ааруул',
    cat: 'Ааруул',
    price: 35000,
    size: '1 кг',
    place: 'Түнэл сум',
    emoji: '🥛'
  },
  {
    id: 2,
    name: 'Монгол шар тос',
    cat: 'Шар тос',
    price: 40000,
    size: '500 гр',
    place: 'Хөвсгөл',
    emoji: '🧈'
  },
  {
    id: 3,
    name: 'Гэрийн өрөм',
    cat: 'Өрөм',
    price: 28000,
    size: '500 гр',
    place: 'Архангай',
    emoji: '🥣'
  },
  {
    id: 4,
    name: 'Шинэ цөцгий',
    cat: 'Цөцгий',
    price: 12000,
    size: '500 мл',
    place: 'Булган',
    emoji: '🥛'
  },
  {
    id: 5,
    name: 'Цэвэр сүүний масло',
    cat: 'Масло',
    price: 18000,
    size: '250 гр',
    place: 'Сэлэнгэ',
    emoji: '🧈'
  },
  {
    id: 6,
    name: 'Монгол бяслаг',
    cat: 'Бяслаг',
    price: 22000,
    size: '500 гр',
    place: 'Хөвсгөл',
    emoji: '🧀'
  },
  {
    id: 7,
    name: 'Гүүний цэвэр айраг',
    cat: 'Айраг',
    price: 7000,
    size: '500 мл',
    place: 'Түнэл сум',
    emoji: '🐎'
  },
  {
    id: 8,
    name: 'Ааруулын бэлгийн багц',
    cat: 'Бэлгийн багц',
    price: 55000,
    size: '1 багц',
    place: 'Хөвсгөл',
    emoji: '🎁'
  }
];

const cats = [
  'Бүгд',
  'Ааруул',
  'Шар тос',
  'Өрөм',
  'Цөцгий',
  'Масло',
  'Бяслаг',
  'Айраг',
  'Бэлгийн багц'
];

const money = (n) =>
  new Intl.NumberFormat('mn-MN').format(n) + '₮';

export default function Home() {
  const [cat, setCat] = useState('Бүгд');
  const [q, setQ] = useState('');
  const [cart, setCart] = useState([]);
  const [seller, setSeller] = useState(false);
  const [login, setLogin] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkout, setCheckout] = useState(false);

  const [customer, setCustomer] = useState({
    name: '',
    phone: '',
    address: ''
  });

  const list = useMemo(
    () =>
      products.filter(
        (p) =>
          (cat === 'Бүгд' || p.cat === cat) &&
          (p.name.toLowerCase().includes(q.toLowerCase()) ||
            p.place.toLowerCase().includes(q.toLowerCase()))
      ),
    [cat, q]
  );

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const cartCount = cart.reduce(
    (sum, item) => sum + item.qty,
    0
  );

  const add = (product) => {
    setCart((current) => {
      const found = current.find(
        (item) => item.id === product.id
      );

      if (found) {
        return current.map((item) =>
          item.id === product.id
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      }

      return [...current, { ...product, qty: 1 }];
    });
  };

  const increase = (id) => {
    setCart((current) =>
      current.map((item) =>
        item.id === id
          ? { ...item, qty: item.qty + 1 }
          : item
      )
    );
  };

  const decrease = (id) => {
    setCart((current) =>
      current
        .map((item) =>
          item.id === id
            ? { ...item, qty: item.qty - 1 }
            : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  const removeItem = (id) => {
    setCart((current) =>
      current.filter((item) => item.id !== id)
    );
  };

  const submitOrder = () => {
    if (!customer.name || !customer.phone || !customer.address) {
      alert('Нэр, утас, хүргэлтийн хаягаа бүрэн оруулна уу.');
      return;
    }

    alert(
      `Захиалга амжилттай илгээгдлээ!\n\n` +
      `Захиалагч: ${customer.name}\n` +
      `Утас: ${customer.phone}\n` +
      `Хаяг: ${customer.address}\n` +
      `Нийт: ${money(total)}`
    );

    setCart([]);
    setCustomer({
      name: '',
      phone: '',
      address: ''
    });
    setCheckout(false);
    setCartOpen(false);
  };

  return (
    <main>
      <header>
        <div className="brand">
          🥛
          <div>
            <span>ЦАГААН ИДЭЭ</span>
            <small>
              Монголын цагаан идээний онлайн зах
            </small>
          </div>
        </div>

        <div className="actions">
          <button onClick={() => setLogin(true)}>
            Нэвтрэх
          </button>

          <button
            className="cart"
            onClick={() => setCartOpen(true)}
          >
            🛒 {cartCount}
          </button>
        </div>
      </header>

      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">
            МОНГОЛЫН ӨВ · ШИНЭХЭН БҮТЭЭГДЭХҮҮН
          </p>

          <h1>
            Жинхэнэ цагаан
            <br />
            идээг
            <br />
            шууд
            <br />
            үйлдвэрлэгчээс.
          </h1>

          <p>
            Ааруул, өрөм, шар тос, цөцгий, бяслаг,
            айраг болон бусад бүтээгдэхүүнийг
            Монголын үйлдвэрлэгчдээс нэг дор.
          </p>

          <button
            className="primary"
            onClick={() =>
              document
                .getElementById('products')
                .scrollIntoView({ behavior: 'smooth' })
            }
          >
            Бараа үзэх →
          </button>
        </div>

        <div className="hero-art">
          🐎
          <br />
          <span>🥛 🧈 🧀</span>
        </div>
      </section>

      <section className="toolbar">
        <input
          placeholder="🔎  Бараа, аймаг, сум хайх..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />

        <div className="cats">
          {cats.map((c) => (
            <button
              className={cat === c ? 'active' : ''}
              onClick={() => setCat(c)}
              key={c}
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      <section id="products" className="section">
        <div className="section-head">
          <div>
            <h2>Шинэ бүтээгдэхүүн</h2>
            <p>{list.length} бүтээгдэхүүн</p>
          </div>

          <button
            onClick={() => setSeller(true)}
            className="outline"
          >
            ＋ Бараагаа зараарай
          </button>
        </div>

        <div className="grid">
          {list.map((p) => (
            <article className="card" key={p.id}>
              <div className="photo">{p.emoji}</div>

              <div className="body">
                <span className="tag">{p.cat}</span>

                <h3>{p.name}</h3>

                <p>
                  📍 {p.place} · {p.size}
                </p>

                <strong>{money(p.price)}</strong>

                <button
                  className="buy"
                  onClick={() => add(p)}
                >
                  Сагсанд нэмэх
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="sell">
        <div>
          <p className="eyebrow">
            ҮЙЛДВЭРЛЭГЧ, МАЛЧИН, БОРЛУУЛАГЧ БҮРТ
          </p>

          <h2>
            Өөрийн цагаан идээгээ
            <br />
            Монгол даяар зараарай.
          </h2>

          <p>
            Өөрийн дэлгүүрээ нээгээд бүтээгдэхүүнээ нэм.
            Захиалгаа нэг дор удирдана.
          </p>
        </div>

        <button
          className="primary"
          onClick={() => setSeller(true)}
        >
          Худалдагчаар бүртгүүлэх →
        </button>
      </section>

      <section className="steps">
        <h2>Хэрхэн ажиллах вэ?</h2>

        <div className="stepgrid">
          {[
            [
              '01',
              'Бүртгүүлэх',
              'Хэрэглэгч эсвэл худалдагчаар бүртгүүлнэ.'
            ],
            [
              '02',
              'Бараа сонгох',
              'Бүтээгдэхүүнээ сонгон сагсанд нэмнэ.'
            ],
            [
              '03',
              'Төлбөр хийх',
              'QPay болон боломжит төлбөрийн аргаар төлнө.'
            ],
            [
              '04',
              'Хүлээн авах',
              'Захиалгаа хүргэлтээр эсвэл тохирсон газраас авна.'
            ]
          ].map((x) => (
            <div className="step" key={x[0]}>
              <b>{x[0]}</b>
              <h3>{x[1]}</h3>
              <p>{x[2]}</p>
            </div>
          ))}
        </div>
      </section>

      <footer>
        <b>🥛 ЦАГААН ИДЭЭ</b>
        <span>
          Монгол цагаан идээг үйлдвэрлэгчээс хэрэглэгчид.
        </span>
        <span>© 2026</span>
      </footer>

      {cartOpen && (
        <Modal
          title="Таны сагс"
          close={() => setCartOpen(false)}
        >
          {cart.length === 0 ? (
            <>
              <p>🛒 Таны сагс одоогоор хоосон байна.</p>

              <button
                className="primary"
                onClick={() => setCartOpen(false)}
              >
                Бараа үзэх
              </button>
            </>
          ) : (
            <>
              <div
                style={{
                  display: 'grid',
                  gap: '14px'
                }}
              >
                {cart.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      borderBottom: '1px solid #eee',
                      paddingBottom: '14px'
                    }}
                  >
                    <strong>{item.name}</strong>

                    <p>
                      {money(item.price)} × {item.qty}
                    </p>

                    <div
                      style={{
                        display: 'flex',
                        gap: '8px',
                        alignItems: 'center'
                      }}
                    >
                      <button
                        className="outline"
                        onClick={() =>
                          decrease(item.id)
                        }
                      >
                        −
                      </button>

                      <strong>{item.qty}</strong>

                      <button
                        className="outline"
                        onClick={() =>
                          increase(item.id)
                        }
                      >
                        ＋
                      </button>

                      <button
                        className="outline"
                        onClick={() =>
                          removeItem(item.id)
                        }
                      >
                        🗑
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <h2>
                Нийт: {money(total)}
              </h2>

              <button
                className="primary"
                onClick={() => setCheckout(true)}
              >
                Захиалга өгөх →
              </button>
            </>
          )}
        </Modal>
      )}

      {checkout && (
        <Modal
          title="Захиалга баталгаажуулах"
          close={() => setCheckout(false)}
        >
          <input
            placeholder="Таны нэр"
            value={customer.name}
            onChange={(e) =>
              setCustomer({
                ...customer,
                name: e.target.value
              })
            }
          />

          <input
            placeholder="Утасны дугаар"
            type="tel"
            value={customer.phone}
            onChange={(e) =>
              setCustomer({
                ...customer,
                phone: e.target.value
              })
            }
          />

          <textarea
            placeholder="Хүргэлтийн хаяг"
            value={customer.address}
            onChange={(e) =>
              setCustomer({
                ...customer,
                address: e.target.value
              })
            }
          />

          <h3>
            Төлөх дүн: {money(total)}
          </h3>

          <button
            className="primary"
            onClick={submitOrder}
          >
            Захиалгаа баталгаажуулах
          </button>
        </Modal>
      )}

      {seller && (
        <Modal
          title="Худалдагчаар бүртгүүлэх"
          close={() => setSeller(false)}
        >
          <input placeholder="Нэр / дэлгүүрийн нэр" />
          <input
            placeholder="Утасны дугаар"
            type="tel"
          />
          <input placeholder="Аймаг, сум" />
          <textarea
            placeholder="Ямар цагаан идээ зардаг вэ?"
          />

          <button
            className="primary"
            onClick={() => {
              setSeller(false);
              alert(
                'Хүсэлт илгээгдлээ. Админ баталгаажуулсны дараа дэлгүүр нээгдэнэ.'
              );
            }}
          >
            Хүсэлт илгээх
          </button>
        </Modal>
      )}

      {login && (
        <Modal
          title="Нэвтрэх / бүртгүүлэх"
          close={() => setLogin(false)}
        >
          <input
            placeholder="Утасны дугаар"
            type="tel"
          />

          <input
            placeholder="Нууц үг"
            type="password"
          />

          <button
            className="primary"
            onClick={() => {
              setLogin(false);
              alert(
                'Дараагийн хувилбарт SMS баталгаажуулалт холбогдоно.'
              );
            }}
          >
            Нэвтрэх
          </button>
        </Modal>
      )}
    </main>
  );
}

function Modal({ title, close, children }) {
  return (
    <div className="shade" onClick={close}>
      <div
        className="modal"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="x" onClick={close}>
          ×
        </button>

        <h2>{title}</h2>

        {children}
      </div>
    </div>
  );
}
