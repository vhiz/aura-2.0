import './rightbar.scss'

export default function Rightbar() {
  return (
    <div className='rightbar'>
      <div className="contanier">
        <div className="item">
          <span>Suggestions</span>
          <div className="user">
            <div className="userInfo">
              <img src="https://wallpapers.com/images/high/sorrowful-peter-griffin-pfi29qp59bmvsbcj.webp" alt="" />
              <span>Peter Grifin</span>
            </div>
            <div className="buttons">
              <button>follow</button>
              <button>dismiss</button>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img src="https://wallpaperaccess.com/full/638699.jpg" alt="" />
              <span>Bart Simpson</span>
            </div>
            <div className="buttons">
              <button>follow</button>
              <button>dismiss</button>
            </div>
          </div>
        </div>

        <div className="item">
          <span>Latest activities</span>
          <div className="user">
            <div className="userInfo">
              <img src="https://wallpapers.com/images/high/sorrowful-peter-griffin-pfi29qp59bmvsbcj.webp" alt="" />
              <p>
                <span>Peter Grifin</span> created a new account
              </p>
            </div>
            <span>1 min ago</span>
          </div>
          <div className="user">
            <div className="userInfo">
              <img src="https://wallpaperaccess.com/full/638699.jpg" alt="" />
              <p>
                <span>Bart Simpson</span> created a new account
              </p>
            </div>
            <span>1 min ago</span>
          </div>
          <div className="user">
            <div className="userInfo">
              <img src="https://wallpapers.com/images/high/sorrowful-peter-griffin-pfi29qp59bmvsbcj.webp" alt="" />
              <p>
                <span>Peter Grifin</span> created a new account
              </p>
            </div>
            <span>1 min ago</span>
          </div>
          <div className="user">
            <div className="userInfo">
              <img src="https://wallpapers.com/images/high/sorrowful-peter-griffin-pfi29qp59bmvsbcj.webp" alt="" />
              <p>
                <span>Peter Grifin</span> created a new account
              </p>
            </div>
            <span>1 min ago</span>
          </div>
        </div>

        <div className="item">
          <span>Online friends</span>
          <div className="user">
            <div className="userInfo">
              <img src="https://wallpapers.com/images/high/sorrowful-peter-griffin-pfi29qp59bmvsbcj.webp" alt="" />
              <div className="online" />
              <span>Peter Grifin</span>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img src="https://c4.wallpaperflare.com/wallpaper/486/223/659/family-guy-lois-griffin-wallpaper-preview.jpg" alt="" />
              <div className="online" />
              <span>Lois Griffin</span>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQC0FXGF5pmRyi1GGu8Bbbuw3Gbio_EPsTUnA&usqp=CAU" alt="" />
              <div className="online" />
              <span>Marge Simpon</span>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img src="https://images2.alphacoders.com/467/thumbbig-467171.webp" alt="" />
              <div className="online" />
              <span>Maggie Simpson</span>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img src="https://www.pngitem.com/pimgs/m/93-937041_chris-griffin-by-mighty355-chris-family-guy-costume.png" alt="" />
              <div className="online" />
              <span>Chris Griffin</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
