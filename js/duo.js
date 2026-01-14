// 修正版 Loon 脚本
let body = $response.body;

try {
    let obj = JSON.parse(body);
    // 检查是否是需要修改的目标数据结构
    if (obj.responses && obj.responses.length >= 2 && !('etag' in obj.responses[0].headers)) {
        const timestamp = Math.floor(Date.now() / 1000);
        const userdata = JSON.parse(obj.responses[0].body);
        
        userdata.shopItems.push({
            id: 'gold_subscription',
            purchaseDate: timestamp - 172800,
            purchasePrice: 0,
            subscriptionInfo: {
                expectedExpiration: timestamp + 31536000,
                productId: "com.duolingo.DuolingoMobile.subscription.Gold.TwelveMonth.24Q2Max.168",
                renewer: 'APPLE',
                renewing: true,
                tier: 'twelve_month',
                type: 'gold'
            }
        });

        userdata.subscriberLevel = 'GOLD';
        userdata.trackingProperties.has_item_immersive_subscription = true;
        userdata.trackingProperties.has_item_premium_subscription = true;
        userdata.trackingProperties.has_item_live_subscription = true;
        userdata.trackingProperties.has_item_gold_subscription = true;
        userdata.trackingProperties.has_item_max_subscription = true;
        
        obj.responses[0].body = JSON.stringify(userdata);
        body = JSON.stringify(obj);
    }
} catch (e) {
    // 如果解析失败或发生错误，不做任何处理，直接返回原始 body
    console.log("Script Error: " + e);
}

$done({ body: body });
